import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  templateUrl: './zodiaco.component.html',
  styleUrls: ['./zodiaco.component.css']
})
export class ZodiacoComponent {
  formulario!: FormGroup;
  resultado: any = {};
  zodiacoChino: string = '';
  zodiacoChinoImg: string = '';

  constructor() {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellidoPaterno: new FormControl('', Validators.required),
      apellidoMaterno: new FormControl('', Validators.required),
      edad: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('', Validators.required),
      sexo: new FormControl('', Validators.required),
    });
  }

  CalcularZodiacon(): void {
    const { nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento } = this.formulario.value;
    const nombreCompleto = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;
    const edad = this.calcularEdad(new Date(fechaNacimiento));
    this.zodiacoChino = this.calcularZodiacoChino(new Date(fechaNacimiento).getFullYear());
    this.zodiacoChinoImg = `${this.zodiacoChino}.jpg`;
    this.resultado = {
      nombreCompleto,
      edad
    };
  }

  calcularEdad(fechaNacimiento: Date): number {
    const diferenciaMs = Date.now() - fechaNacimiento.getTime();
    const edadDt = new Date(diferenciaMs);
    return Math.abs(edadDt.getUTCFullYear() - 1970);
  }

  calcularZodiacoChino(anio: number): string {
    const animales = [
      'rata', 'buey', 'tigre', 'conejo', 'dragon', 'serpiente',
      'caballo', 'cabra', 'mono', 'gallo', 'perro', 'cerdo'
    ];
    return animales[(anio - 1900) % 12];
  }
}