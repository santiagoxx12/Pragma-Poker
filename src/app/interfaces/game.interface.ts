export interface Player {
  id: string;
  name: string;
  isSpectator: boolean;
  isOwner?: boolean;
  isAdmin: boolean;
  selectedCard?: string | null;
  position: number;
}

export interface GameState {
  players: Player[];
  roomName: string;
  currentVotingSystem: string[];
  selectedCards: { [playerId: string]: string | null};
  isVotingEnabled: boolean;
  isRevealing: boolean;
  averageVote: number | null;
  voteCount: { [card: string]: number };
}
