import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model.';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public user: User;
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.authService.user.subscribe((res: User) => {
      this.user = res;
    });
  }
}
