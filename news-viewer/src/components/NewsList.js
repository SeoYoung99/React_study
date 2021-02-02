import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';

const NewsLsitBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  // articles라는 상태 선언
  const [loading, setLoading] = useState(false);
  // loadinf이라는 상태 선언 (API요청이 대기중인지 판별)

  useEffect(() => {
    //async를 사용하는 함수 따로 선언
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = category === 'all' ? '' : `&category=${category}`;
        //현재 category값이 무엇인지에 따라 요청할 주소가 동적으로 바뀜
        //category 값이 all이면query 값을 공백으로 설정하고,
        //all이 아니면 &category=카테고리 형태의 문자열을 만들도록 함
        const response = await axios.get(
          //데이터를 불러와서
          `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=66cd214b91f0456ba0db9077554010dd`,
          //그리고 그 문자열을 주소에 포함
        );
        setArticles(response.data.articles); //articles에 업데이트
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]); //category값이 바뀔 때마다 뉴스를 새로 불러와야 하므로 []에 category 넣어줌

  //대기 중일 때
  if (loading) {
    return <NewsLsitBlock> 대기 중...</NewsLsitBlock>;
  }
  //아직 articles값이 설정되지 않았을 때
  if (!articles) {
    //해당값이 현재 null인지 꼭! 검사해야함
    return null;
  }
  //articles값이 유효할 때
  return (
    <NewsLsitBlock>
      {articles.map((article) => (
        <NewsItem key={articles.url} article={article} />
      ))}
    </NewsLsitBlock>
  );
};
export default NewsList;
