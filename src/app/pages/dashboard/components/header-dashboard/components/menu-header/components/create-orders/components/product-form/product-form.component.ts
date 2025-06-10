import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateProductService } from '../../../../../../../../../../services/createproduct.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProdutoFormComponent implements OnInit {
  produtoForm: FormGroup;
  isEditMode = false;
  produtoId: number | null = null;
  loading = false;

  categorias = [
    "Tecnologia",
    "Desenvolvimento Web",
    "Programação",
    "Design Gráfico",
    "Marketing Digital",
    "Fotografia e Vídeo",
    "Negócios e Empreendedorismo",
    "Finanças Pessoais",
    "Idiomas",
    "Saúde e Bem-estar",
    "Yoga e Meditação",
    "Culinária",
    "Música e Produção Musical",
    "Arte e Criatividade",
    "Produtividade e Hábitos",
    "Carreira e Liderança",
    "Ciência de Dados",
    "Inteligência Artificial",
    "Educação e Pedagogia",
    "Cursos Pré-Vestibular"
  ];

  dificuldades = [
    'Básico',
    'Intermediário',
    'Difícil'
  ]


  constructor(
    private fb: FormBuilder,
    private produtoService: CreateProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.produtoForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      preco: ['', [Validators.required, Validators.min(0.01)]],
      concentracao: ['', Validators.required],
      descricao: ['', [Validators.required,Validators.maxLength(500)]],
      estoque: [0, [Validators.required,Validators.min(0)]],
      categoria: ['', Validators.required],
      avaliacao: [0, [Validators.required,Validators.min(0), Validators.max(5)]],
      status: [true, Validators.required],
      imagem: ['', [Validators.required,Validators.pattern(/^(http|https):\/\/[^ "]+$/)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.produtoId = +params['id'];
        this.carregarProduto(this.produtoId);
      }
    });
  }

  carregarProduto(id: number): void {
    this.produtoService.getProdutoById(id).subscribe({
      next: (produto) => {
        this.produtoForm.patchValue(produto);
      },
      error: (err) => {
        console.error('Erro ao carregar produto:', err);
        alert('Erro ao carregar dados do produto');
      }
    });
  }

  onSubmit(): void {
    console.log(this.produtoForm.invalid)
    if (!this.produtoForm.invalid) {
      this.marcarCamposInvalidos();
      this.loading = true;
      const produtoData = this.produtoForm.value;
      console.log(produtoData)
      const operacao = this.isEditMode && this.produtoId
        ? this.produtoService.updateProduto({ ...produtoData, id: this.produtoId })
        : this.produtoService.createProduto(produtoData);
  
      operacao.subscribe({
        next: () => {
          this.loading = false;
          this.resetarFormularioSeNovo();
        },
        error: (err) => {
          this.loading = false;
          console.log(err)
          
        }

      });
      this.router.navigate(['dashboard/criarcurso/']);
      
    }else{
      this.marcarCamposInvalidos();
    }

  }

  private marcarCamposInvalidos(): void {
    Object.values(this.produtoForm.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach(subControl => subControl.markAsTouched());
      }
    });
  }


  private resetarFormularioSeNovo(): void {
    if (!this.isEditMode) {
      this.produtoForm.reset({
        estoque: 0,
        avaliacao: 0,
        status: true
      });
    }
  }

  get formControls() {
    return this.produtoForm.controls;
  }
  
  redirectToList(){
    this.router.navigate(['dashboard/criarcurso/'])
  }
}