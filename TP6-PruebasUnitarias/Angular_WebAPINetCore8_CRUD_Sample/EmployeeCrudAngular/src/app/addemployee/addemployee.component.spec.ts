import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AddemployeeComponent } from './addemployee.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs'; // para simular observables y errores
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../employee.service'; // Asegúrate de importar EmployeeService
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../employee.model'; // Importa el modelo Employee

describe('AddemployeeComponent', () => {
  let component: AddemployeeComponent;
  let fixture: ComponentFixture<AddemployeeComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let employeeService: jasmine.SpyObj<EmployeeService>;

  beforeEach(() => {
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['error']);
    const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['createEmployee']); // Mock del servicio

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AddemployeeComponent], // Importa el componente standalone aquí
      providers: [
        DatePipe,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ id: 1 }) // simula el parámetro id en la URL
          }
        },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: EmployeeService, useValue: employeeServiceSpy } // Proporciona el mock del servicio
      ]
    });

    fixture = TestBed.createComponent(AddemployeeComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    employeeService = TestBed.inject(EmployeeService) as jasmine.SpyObj<EmployeeService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error if name is just spaces', () => {
    component.newEmployee.name = '    ';
    component.addEmployee(component.newEmployee);
    expect(toastrService.error).toHaveBeenCalledWith('El nombre no puede estar vacío o compuesto solo de espacios.');
  });

  it('should display error if name contains numbers', () => {
    component.newEmployee.name = 'John1 Doe';
    component.addEmployee(component.newEmployee);
    expect(toastrService.error).toHaveBeenCalledWith('El nombre no puede contener números.');
  });

  it('should display error if name contains symbols', () => {
    component.newEmployee.name = 'John% Doe';
    component.addEmployee(component.newEmployee);
    expect(toastrService.error).toHaveBeenCalledWith('El nombre no puede contener caracteres especiales.');
  });

  it('should display error if name contains inappropriate words', () => {
    component.newEmployee.name = 'John palabrota';
    component.addEmployee(component.newEmployee);
    expect(toastrService.error).toHaveBeenCalledWith('El nombre contiene palabras inapropiadas.');
  });

  // 1. Test para nombres duplicados
  it('should display error if name is duplicated', () => {
    // Crea una instancia de Employee con parámetros correctos
    const duplicatedEmployee = new Employee(0, 'Juan Carlos', new Date().toISOString());

    // Simular que el servicio devuelve un error de duplicado (400 Bad Request)
    const errorResponse = new HttpErrorResponse({
      error: { message: 'El nombre del empleado ya existe.' },
      status: 400
    });

    employeeService.createEmployee.and.returnValue(throwError(() => errorResponse));

    component.newEmployee = duplicatedEmployee;
    component.addEmployee(component.newEmployee);

    expect(employeeService.createEmployee).toHaveBeenCalledWith(duplicatedEmployee);
    expect(toastrService.error).toHaveBeenCalledWith('El nombre del empleado ya existe.');
  });

  it('should create employee if name is valid and not duplicated', () => {
    const validEmployee = new Employee(0, 'John Doe', new Date().toISOString());

    // Simular que el servicio devuelve una respuesta exitosa
    employeeService.createEmployee.and.returnValue(of(validEmployee));

    component.newEmployee = validEmployee;
    component.addEmployee(validEmployee);

    expect(employeeService.createEmployee).toHaveBeenCalledWith(validEmployee);
    expect(toastrService.error).not.toHaveBeenCalled();
  });

  it('should load employee for editing if id is present in query params', () => {
    spyOn(component, 'editEmployee');
    component.ngOnInit();
    expect(component.editEmployee).toHaveBeenCalledWith(1);
  });

  it('should call EmployeeService.createEmployee when adding a valid employee', () => {
    const validEmployee = new Employee(0, 'John Doe', new Date().toISOString());
    employeeService.createEmployee.and.returnValue(of(validEmployee));
    component.newEmployee = validEmployee;

    component.addEmployee(validEmployee);

    expect(employeeService.createEmployee).toHaveBeenCalledWith(validEmployee);
  });
});
