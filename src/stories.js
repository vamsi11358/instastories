
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CircleContainer = styled.div`
  display: flex;
  overflow-x: auto; /* Enable horizontal scrolling */
  width: 100%;
  max-width: 350px; /* Limit to show only 5 circles at a time */
  padding: 10px;
  box-sizing: border-box;
`;

const Circle = styled.div`
  flex: 0 0 60px; /* Fixed size for each circle */
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  margin: 0 5px;
  border: 2px solid #fff;
  cursor: pointer;
`;

const StoryContent = styled.div`
  width: 100%;
  max-width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  margin-top: 20px;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const Stories = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('https://dog.ceo/api/breed/hound/images');
        setData(response.data.message);
      } catch (error) {
        console.error('Error fetching the stories:', error);
      }
    };

    fetchStories();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStory(prev => (prev + 1) % data.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [data]);

  return (
    <StoryContainer>
      <CircleContainer>
        {data.map((story, index) => (
          <Circle
            key={index}
            style={{ backgroundImage: `url(${story})` }}
            onClick={() => setCurrentStory(index)}
          />
        ))}
      </CircleContainer>
      {data.length > 0 && (
        <StoryContent style={{ backgroundImage: `url(${data[currentStory]})` }}>
        </StoryContent>
      )}
    </StoryContainer>
  );
};

export default Stories;
