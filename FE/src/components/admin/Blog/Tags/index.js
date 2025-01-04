import React, { useEffect, useState } from 'react';
import { TagsInput } from 'react-tag-input-component';
import './styles.css'
import { apiUrl } from '../../../../config/Api';
import { fetchAll } from '../../../../services/Tag';

const TagInput = ({ value, onChange }) => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
      setIsClicked(!isClicked);
    };
  

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const data = await fetchAll(apiUrl, 1, setSuggestions, console.error);
                setSuggestions(data); // Dữ liệu trả về từ API
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchTags();
    }, [apiUrl]);

    useEffect(() => {
        const tagIdToName = suggestions.reduce((acc, tag) => {
            acc[tag.tag_id] = tag.name;
            return acc;
        }, {});

        const tags = Array.isArray(value) ? value.map(id => tagIdToName[id] || '') : [];
        setSelectedTags(tags);
    }, [value, suggestions]);

    const handleTagChange = (newTags) => {
        const nameToTagId = suggestions.reduce((acc, tag) => {
            acc[tag.name] = tag.tag_id;
            return acc;
        }, {});

        const newTagIds = newTags.map(tagName => nameToTagId[tagName] || null).filter(id => id !== null);
        onChange(newTagIds);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        if (value) {
            const filtered = suggestions.filter(tag =>
                tag.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    };

    const handleSuggestionClick = (tag) => {
        setSelectedTags(prev => [...prev, tag.name]);
        handleTagChange([...selectedTags, tag.name]);
        setInputValue('');
        setFilteredSuggestions([]);
    };

    return (
        <div>
            <TagsInput
                value={selectedTags}
                onChange={handleTagChange}
                name="tags"
                placeHolder=""
            />
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter tags"
                className='form-control p-2 mt-4'
            />
            {filteredSuggestions.length > 0 && (
                <ul className="suggestions-list">
                    {filteredSuggestions.map((tag) => (
                        <li key={tag.tag_id} onClick={() => handleSuggestionClick(tag)}>
                            #{tag.name}
                        </li>
                    ))}
                </ul>
            )}
            
        </div>
    );
};

export default TagInput;
