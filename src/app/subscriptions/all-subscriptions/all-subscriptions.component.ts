import { Component, OnInit } from '@angular/core';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';

@Component({
  selector: 'app-all-subscriptions',
  templateUrl: './all-subscriptions.component.html',
  styleUrls: ['./all-subscriptions.component.css'],
})
export class AllSubscriptionsComponent implements OnInit {
  subscribersArray: Array<any> = [];
  constructor(private subscriptionService: SubscriptionsService) {}
  ngOnInit(): void {
    this.subscriptionService.loadSubscribers().subscribe((val) => {
      this.subscribersArray = val;
    });
  }

  onDelete(id: string) {
    this.subscriptionService.deleteSubscriber(id);
  }
}
