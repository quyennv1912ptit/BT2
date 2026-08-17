import React from 'react';

const SearchBar = ({onSearch}) => {
    return (
        <input
            type='text'
            placeholder='Tìm kiếm bài viết...'
            onChange={(e) => onSearch(e.target.value)}
        />
    );
}

export default SearchBar;
