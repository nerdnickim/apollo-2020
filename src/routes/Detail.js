import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import styled from "styled-components";

const GET_MOVIES = gql`
	query getMovie($id: Int!) {
		movie(id: $id) {
			id
			title
			language
			rating
			medium_cover_image
			description_full
		}
	}
`;

const Container = styled.div`
	height: 100vh;
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	color: white;
	background-image: linear-gradient(-45deg, #d754ab, #fd723a);
`;

const Column = styled.div`
	margin-left: 10px;
	width: 50%;
`;

const Title = styled.h1`
	font-size: 60px;
	margin-bottom: 15px;
`;

const Subtitle = styled.h4`
	font-size: 35px;
	margin-bottom: 10px;
`;

const Description = styled.p`
	font-size: 20px;
`;

const Poster = styled.div`
	width: 25%;
	height: 60%;
	background-image: url(${(props) => props.bg});
	background-size: cover;
	background-position: center center;
	background-color: transparent;
`;

export default () => {
	let { id } = useParams();
	id = parseInt(id);
	const { loading, data } = useQuery(GET_MOVIES, {
		variables: { id },
	});
	return (
		<Container>
			<Column>
				<Title>{loading ? "Loading..." : data.movie.title}</Title>
				{!loading && data.movie && (
					<>
						<Subtitle>
							{data.movie.language} | {data.movie.rating}
						</Subtitle>
						<Description>{data.movie.description_full}</Description>
					</>
				)}
			</Column>
			<Poster bg={data && data.movie ? data.movie.medium_cover_image : ""}></Poster>
		</Container>
	);
};
