import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-menu-bk',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatSidenavModule],
  templateUrl: './menu-bk.component.html',
  styleUrl: './menu-bk.component.css'
})
export class MenuBkComponent {

}
