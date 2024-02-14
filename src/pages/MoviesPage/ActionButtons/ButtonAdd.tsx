import React from "react";

import {postToAddedMovieList} from "../../../services/movieList";
import useUpdateList from "../MovieListRecommended/hooks/useUpdateList";
import {ButtonLabel, Emoji} from "../../../constants/constants";

import Button from "../../../components/generic/Button/Button";

interface ButtonAddProps {
  movieId?: string,
  role?: 'primary' | 'secondary',
  buttonStyle?: "contained" | "contained-secondary",
  buttonActivationSettings?: {
    onButtonMouseEnter: (role: string) => void,
    onButtonMouseLeave: (role: string) => void,
    onPrimaryButtonClick: () => void,
  }
}

export function ButtonAdd({movieId, role, buttonStyle, buttonActivationSettings} : ButtonAddProps) {
  if(!buttonStyle) {
    throw new Error("If buttonStyle comes up as undefined, add it directly as a prop to where ButtonRemove component is being composed.");
  }

  if(!role) {
    throw new Error("If role comes up as undefined, add it directly as a prop to where ButtonRemove component is being composed.");
  }

  if(!movieId) throw new Error("movieId is undefined");

  const addedList = useUpdateList(postToAddedMovieList);

  const handleMouseEnter = () => buttonActivationSettings?.onButtonMouseEnter(role);
  const handleMouseLeave = () => buttonActivationSettings?.onButtonMouseLeave(role);

  const handleClickButtonAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    // Send movie from recommended list to added list
    addedList.mutate(movieId);

    buttonActivationSettings?.onPrimaryButtonClick();
  }

  return (
    <Button variant={buttonStyle}
            type="button"
            hasIcon icon={Emoji.ThumbsUp}
            handleButtonClick={handleClickButtonAdd}
            handleButtonMouseEnter={handleMouseEnter}
            handleButtonMouseLeave={handleMouseLeave}
    >
      {ButtonLabel.Add}
    </Button>
  );
}
