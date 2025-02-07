import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './utils/services/auth.service';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  showSplashScreen = true;

  title='pragma-poker';

  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  ngOnInit() {
    setTimeout(() => {
      this.showSplashScreen = false;
      if (this.authService.isAuthenticated()) {
        this.router.navigate(['/game-room']);
      } else {
        this.router.navigate(['/login']);
      }
    }, 2000);
  }

}
