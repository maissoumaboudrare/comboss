export type Combo = {
  comboID: number;
  comboName: string;
  positions: { positionName: string }[];
  inputs: {
    inputName: string;
    inputSrc: string;
    lineOrder: number;
    inputOrder: number;
  }[];
  username: string;
  avatar: string;
  userID: number;
  likeCount: number;
  isFavorite: boolean;
  isLiked: boolean;
  videoURL?: string;
  createdAt: string | Date;
};

export type ComboDataForm = {
  combo: {
    characterID: number;
    comboName: string;
    videoURL: string | undefined;
  };
  positions: {
    positionName: string;
  }[];
  inputs: {
    inputName: string;
    inputSrc: string;
  }[][];
}