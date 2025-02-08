import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vote-results',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './vote-results.component.html',
  styleUrl: './vote-results.component.css'
})
export class VoteResultsComponent {
  @Input() voteCount: { [key: string]: number } = {};
  @Input() averageVote: number | null = null;

  get votesArray() {
    return Object.entries(this.voteCount).map(([card, count]) => ({
      card,
      count
    }));
    }
  
} 
