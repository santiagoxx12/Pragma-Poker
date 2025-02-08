export interface Player {
  id: string;
  name: string;
  isSpectator: boolean;
  isAdmin: boolean;
  selectedCard?: string | null;
  position: number;
}

export interface GameState {
  players: Player[];
  roomName: string;
  currentVotingSystem: string[];
  selectedCards: { [playerId: string]: string };
  isVotingEnabled: boolean;
}
