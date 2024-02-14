import React from 'react';

import {postToRejectedMovieList} from "../../../services/movieList";
import useUpdateList from "../MovieListRecommended/hooks/useUpdateList";
import {ButtonLabel, Emoji} from "../../../constants/constants";

import Button from "../../../components/generic/Button/Button";

interface ButtonRemoveProps {
  movieId?: string,
  role?: 'primary' | 'secondary',
  buttonStyle?: "contained" | "contained-secondary",
  // TO DO: Reuse this type for the other buttons?
  buttonActivationSettings?: {
    onButtonMouseEnter: (role: string) => void,
    onButtonMouseLeave: (role: string) => void,
    onPrimaryButtonClick: () => void,
  },
}

export function ButtonRemove({movieId, role, buttonStyle, buttonActivationSettings}: ButtonRemoveProps) {
  if(!buttonStyle) {
    throw new Error("If buttonStyle comes up as undefined, add it directly as a prop to where ButtonRemove component is being composed.");
  }

  if(!role) {
    throw new Error("If role comes up as undefined, add it directly as a prop to where ButtonRemove component is being composed.");
  }

  if(!movieId) throw new Error("movieId is undefined");

  const removedList = useUpdateList(postToRejectedMovieList);

  const handleClickButtonRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    // Send (not delete) movie from recommended list to removed list
    removedList.mutate(movieId);

    buttonActivationSettings?.onPrimaryButtonClick();
  }

  const handleMouseEnter = () => buttonActivationSettings?.onButtonMouseEnter(role);
  const handleMouseLeave = () => buttonActivationSettings?.onButtonMouseLeave(role);

  return (
      <Button variant={buttonStyle}
              type="button"
              hasIcon icon={Emoji.ThumbsDown}
              handleButtonClick={handleClickButtonRemove}
              handleButtonMouseEnter={handleMouseEnter}
              handleButtonMouseLeave={handleMouseLeave}
      >
        {ButtonLabel.Remove}
      </Button>
  );
}
