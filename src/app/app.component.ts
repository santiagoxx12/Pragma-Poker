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

//mira aqui salen todos los errores pero hay alkgunos que no importan mucho, por ejemplo lo del title era una bobada, los que nos importan sonn los de las validaciones, pero resolvvamos los errores del app component, vamos al spect.ts
  title='pragma-poker';

  constructor(private readonly router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.showSplashScreen = false;
      this.router.navigate(['/create-game']);
    }, 2000);
  }
}