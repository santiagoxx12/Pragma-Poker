import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  showSplashScreen = true;

  title='pragma-poker';

  constructor(private readonly router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.showSplashScreen = false;
      this.router.navigate(['/login']);
    }, 2000);
  }
}
