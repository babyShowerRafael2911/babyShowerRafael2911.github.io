import { Component, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { InvitacionesService } from '../app.service';
import Swal from 'sweetalert2';

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./invitation.component.html",
  styleUrls: ["./invitation.component.css"]
})
export class Invitation implements OnInit {
  currentPage = 1;
  totalPages = 8;
  invitaciones: any[] = [];

  //Formulario
  nombre: string = '';
  total: number = 0;
  mensajeConfirmacion: string = '';
  constructor(private invitacionesService: InvitacionesService) {}

  ngOnInit(): void {
    this.invitacionesService.obtenerInvitaciones().subscribe(data => {
      this.invitaciones = data;
      console.log('Invitaciones cargadas:', data);
    });
  }

  crearInvitacion(): void {
    const nueva = {
      nombre: 'Fiesta Dino',
      fecha: '2025-11-15',
      pagina: this.currentPage
    };
    this.invitacionesService.agregarInvitacion(nueva).then(() => {
      console.log('Invitación guardada');
    });
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  getZIndex(page: number): number {
    return this.totalPages - page;
  }

  //Mandar datos del formulario
    confirmarAsistencia(): void {
      if (!this.nombre) {
        Swal.fire({
          title: 'Dato inválido',
          text: 'Este campo no puede ir vacio',
          icon: 'warning',
          confirmButtonColor: '#d16e6e'
        });
        return;
      }
      if (!Number.isInteger(this.total) || this.total < 1 || this.total > 30) {
        Swal.fire({
          title: 'Dato inválido',
          text: 'Ingresa un número válido',
          icon: 'warning',
          confirmButtonColor: '#d16e6e'
        });
        return;
      }

      const asistencia = {
        nombre: this.nombre,
        total: this.total,
        timestamp: new Date()
      };

      this.invitacionesService.agregarInvitacion(asistencia).then(() => {
       // console.log('Asistencia guardada');
       // this.mensajeConfirmacion = '¡Gracias por confirmar tu asistencia!';
       Swal.fire({
        title: '¡Gracias por confirmar!',
        text: 'Estamos seguros que la pasaremos muy bien!!',
        icon: 'success',
        iconColor:"#083002ff",
        confirmButtonText: 'Aceptar',
        confirmButtonColor:"#0f5b03",
        customClass: {
          popup: 'alerta-personalizada'
        }
      });
        this.nombre = '';
        this.total = 0;
      });
    }



}
