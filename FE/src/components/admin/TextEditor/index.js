import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState, AtomicBlockUtils } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './styles.css';
import { uploadFileBlog } from '../../../services/Firebase';
import htmlToDraft from 'html-to-draftjs';
import sanitizeHtml from 'sanitize-html';

const myBlockRenderer = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'atomic') {
        return {
            component: MediaComponent,
            editable: false,
            props: {
                foo: 'bar',
            },
        };
    }
};

class MediaComponent extends Component {
    render() {
        const { block, contentState } = this.props;
        const entityKey = block.getEntityAt(0);
        if (!entityKey) {
            console.warn("Entity key is null for block:", block);
            return null;
        }
        const data = contentState.getEntity(entityKey).getData();
        return (
            <div>
                <p>
                    <img
                        src={data.src}
                        alt={data.alt || ''}
                        style={{ height: data.height || 'auto', width: data.width || 'auto' }}
                    />
                </p>
            </div>
        );
    }
}

export default class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: props.editorState || EditorState.createEmpty(),
            hiddenContent: '',
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.editorState !== this.props.editorState) {
            this.setState({ editorState: this.props.editorState });
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({ editorState });
        if (this.props.onChange) {
            this.props.onChange(editorState);
        }

        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);

        rawContentState.blocks.forEach((block) => {
            block.entityRanges.forEach((range) => {
                const entityKey = range.key;
                if (rawContentState.entityMap[entityKey]?.type === 'LINK') {
                    rawContentState.entityMap[entityKey].data.url = 'http://localhost:3000';
                }
            });
        });

        const jsonString = JSON.stringify(rawContentState);
        this.setState({ hiddenContent: jsonString });
    };

    componentDidMount() {
        const { content } = this.props;
        if (content) {
            const sanitizedContent = content.replace(/href="(http[s]?:\/\/[^\"]+)"/g, 'href="http://localhost:3000"');

            const contentBlock = htmlToDraft(sanitizedContent);
            if (contentBlock) {
                const { contentBlocks, entityMap } = contentBlock;
                const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                this.setState({
                    editorState: EditorState.createWithContent(contentState)
                });
            } else {
                console.error("Failed to convert HTML to Draft content.");
            }
        }
    }

    handlePaste = async (event) => {
        const { editorState } = this.state;
        const items = event.clipboardData.items;

        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const file = items[i].getAsFile();
                if (file) {
                    try {
                        const response = await this.uploadImageCallBack(file);
                        const { link } = response.data;

                        const contentState = editorState.getCurrentContent();
                        const contentStateWithEntity = contentState.createEntity(
                            'IMAGE',
                            'IMMUTABLE',
                            { src: link }
                        );
                        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

                        if (!entityKey) {
                            console.error("Entity key is invalid or null.");
                            return;
                        }

                        const newEditorState = AtomicBlockUtils.insertAtomicBlock(
                            editorState,
                            entityKey,
                            ' '
                        );

                        this.setState({ editorState: newEditorState });
                        return true;
                    } catch (error) {
                        console.error('Error uploading image: ', error);
                    }
                }
            }
        }

        const html = event.clipboardData.getData('text/html');
        if (html) {
            const fixedHTML = html.replace(/href="(http[s]?:\/\/[^\"]+)"/g, 'href="http://localhost:3000"');
            const sanitizedHTML = sanitizeHtml(fixedHTML, {
                allowedTags: ['p', 'b', 'i', 'u', 'ul', 'ol', 'li', 'br', 'img', 'a'],
                allowedAttributes: {
                    'img': ['src', 'alt'],
                    'a': ['href'],
                },
            });

            const contentBlock = htmlToDraft(sanitizedHTML);
            if (contentBlock) {
                const { contentBlocks, entityMap } = contentBlock;
                const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
                const newEditorState = EditorState.createWithContent(contentState);
                this.setState({ editorState: newEditorState });
            } else {
                console.error("Failed to convert pasted HTML to Draft content.");
            }
            return true;
        }

        return false;
    };

    uploadImageCallBack = async (file) => {
        try {
            const url = await uploadFileBlog(file);
            if (url && url.startsWith('http')) {
                return { data: { link: url } };
            } else {
                throw new Error('Invalid URL returned from uploadFileBlog');
            }
        } catch (error) {
            console.error("Error uploading image: ", error);
            throw error;
        }
    };

    render() {
        const { editorState, hiddenContent } = this.state;
        return (
            <div className="editor-container" onPaste={this.handlePaste}>
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                    customBlockRenderFunc={myBlockRenderer}
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        image: {
                            uploadCallback: this.uploadImageCallBack,
                            previewImage: true,
                            alt: { present: true, mandatory: true }
                        },
                    }}
                />
                <input type="hidden" value={hiddenContent} />
            </div>
        );
    }
}
