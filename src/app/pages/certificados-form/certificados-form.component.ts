import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../_components/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../_components/secondary-button/secondary-button.component';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificados-form',
  imports: [PrimaryButtonComponent, SecondaryButtonComponent, FormsModule, CommonModule],
  templateUrl: './certificados-form.component.html',
  styleUrl: './certificados-form.component.css',
})
export class CertificadosFormComponent {
  nome: string = '';
  atividade: string = '';
  atividades: string[] = ['Angular', 'React'];

  campoInvalido(control: NgModel) {
    return control.invalid && control.touched;
  }

  formValido() {
    return this.atividades.length > 0 && this.nome.length > 0;
  }

  adicionarAtividade() {
    this.atividades.push(this.atividade);
    this.atividade = "";
  }

  excluirAtividade(index: number) {
    this.atividades.splice(index, 1);
  }
}