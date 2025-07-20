import { Component, ViewChild } from '@angular/core';
import { PrimaryButtonComponent } from '../../_components/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../_components/secondary-button/secondary-button.component';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Certificado } from '../../interface/certificado';
import { CertificadoService } from '../../_services/certificado.service';
import { v4 as uuidv4 } from 'uuid'

@Component({
  selector: 'app-certificados-form',
  imports: [PrimaryButtonComponent, SecondaryButtonComponent, FormsModule, CommonModule],
  templateUrl: './certificados-form.component.html',
  styleUrl: './certificados-form.component.css',
})
export class CertificadosFormComponent {
  constructor(private readonly certificadoService: CertificadoService) { }
  @ViewChild('form') form!: NgForm

  certificado: Certificado = {
    id: '',
    atividades: [],
    nome: "",
    dataEmissao: '',
  };
  atividade: string = "";

  campoInvalido(control: NgModel) {
    return control.invalid && control.touched;
  }

  formValido() {
    return this.certificado.atividades.length > 0 && this.certificado.nome.length > 0;
  }

  adicionarAtividade() {
    if(this.atividade.length === 0) return;
    this.certificado.atividades.push(this.atividade);
    this.atividade = "";
  }

  excluirAtividade(index: number) {
    this.certificado.atividades.splice(index, 1);
  }

  submit() {
    if(!this.formValido) {
      return;
    } 
    this.certificado.dataEmissao = this.dataAtual()
    this.certificado.id = uuidv4();
    this.certificadoService.adicionarCertificado(this.certificado);

    this.certificado = this.estadoInicialCertificado();
    this.form.resetForm();
  }
  
  dataAtual() {
    const dataAtual = new Date()
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear()

    const dataFormatada = `${dia}/${mes}/${ano}`
    return dataFormatada
  }

  estadoInicialCertificado(): Certificado {
    return  {
      id: '',
      atividades: [],
      nome: "",
      dataEmissao: '',
    };
  }
}