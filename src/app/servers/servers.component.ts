import { Component, OnInit } from '@angular/core';
import { HetznerService } from '../hetzner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servers.component.html',
  styleUrl: './servers.component.css'
})

export class ServersComponent implements OnInit {
  servers: any[] = [];

  constructor(private hetznerService: HetznerService) {}

  ngOnInit(): void {
    // Fetch the server data on initialization
    this.hetznerService.getServerData().subscribe(
      (data) => {
        this.servers = data.servers; // Assuming the response has a 'servers' array
      },
      (error) => {
        console.error('Error fetching server data:', error);
      }
    );
  }
}