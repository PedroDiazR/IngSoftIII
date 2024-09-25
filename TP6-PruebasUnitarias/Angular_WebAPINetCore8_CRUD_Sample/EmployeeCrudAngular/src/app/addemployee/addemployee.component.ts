import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addemployee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  newEmployee: Employee = new Employee(0, '', '');
  submitBtnText: string = "Create";
  imgLoadingDisplay: string = 'none';
  inappropriateWords: string[] = ['palabron', 'palabrota']; // Agrega aquí las palabras inapropiadas

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const employeeId = params['id'];
      if (employeeId)
        this.editEmployee(employeeId);
    });
  }

  addEmployee(employee: Employee) {
    // 1: Verificar que el nombre no esté vacío o compuesto solo de espacios
    if (!employee.name.trim()) {
      this.toastr.error('El nombre no puede estar vacío o compuesto solo de espacios.');
      return;
    }
    // 2: Validar que el nombre no contenga números
    const regex = /\d/;
    if (regex.test(employee.name)) {
      this.toastr.error('El nombre no puede contener números.');
      return;
    }
    // 3: Validar que el nombre no contenga caracteres especiales
    const nameRegex = /^[a-zA-Z\s'áéíóúÁÉÍÓÚñÑ]+$/;
    if (!nameRegex.test(employee.name)) {
      this.toastr.error('El nombre no puede contener caracteres especiales.');
      return;
    }
    // 4: Filtro de palabras inapropiadas
    for (const word of this.inappropriateWords) {
      if (employee.name.toLowerCase().includes(word.toLowerCase())) {
        this.toastr.error("El nombre contiene palabras inapropiadas.");
        return;
      }
    }

    // 5: Verificar que el nombre no esté repetido
    employee.createdDate = new Date().toISOString();
    this.employeeService.createEmployee(employee).subscribe({
      next: result => {
        this.router.navigate(['/']);
      },
      error: err => {
        if (err.status === 400 && err.error.message === 'El nombre del empleado ya existe.') {
          this.toastr.error(err.error.message);
        } else {
          this.toastr.error('Ocurrió un error al crear el empleado.');
        }
      }
    });

    this.submitBtnText = "";
    this.imgLoadingDisplay = 'inline';
  }

  editEmployee(employeeId: number) {
    this.employeeService.getEmployeeById(employeeId).subscribe(res => {
      this.newEmployee.id = res.id;
      this.newEmployee.name = res.name;
      this.submitBtnText = "Edit";
    });
  }
}
