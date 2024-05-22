import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const CircleContainer = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
`;

const Circle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  margin: 0 5px;
  border: 2px solid #fff;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const StoryContent = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  margin-top: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-image 0.5s ease-in-out;

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

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    dots: false
  };

  return (
    <StoryContainer>
      <CircleContainer>
        <Slider {...settings}>
          {data.map((story, index) => (
            <>
            <Circle
              key={index}
              style={{ backgroundImage: `url(${story})` }}
              onClick={() => setCurrentStory(index)}
            />
            </>
           ))}
        </Slider>
      </CircleContainer>
      {data.length > 0 && (
        <StoryContent style={{ backgroundImage: `url(${data[currentStory]})` }}>
        </StoryContent>
      )}
    </StoryContainer>
  );
};

export default Stories;
