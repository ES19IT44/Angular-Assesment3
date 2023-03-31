import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray,FormBuilder,AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-customerform',
  templateUrl: './customerform.component.html',
  styleUrls: ['./customerform.component.css']
})
export class CustomerformComponent implements OnInit{
  customerForm!: FormGroup;
  machineTypes = ['Scissor lift', 'Boom lift', 'Forklift', 'Excavator'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      companyName: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phoneno: ['', [
        Validators.required,
        Validators.pattern('[0-9]{10}')
      ]],
      machines: this.formBuilder.array([])
    });
  }

  get machineForms() {
    return this.customerForm.get('machines') as FormArray;
  }

  createMachineForm() {
    return this.formBuilder.group({
      machineType: [this.machineTypes[0]],
      amount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onAddMachine() {
    this.machineForms.push(this.createMachineForm());
  }

  onDeleteMachine(i: number) {
    this.machineForms.removeAt(i);
  }

  onSubmit() {
    if (this.customerForm.valid) {
      alert('Order is successfully placed');
      this.customerForm.reset();
  }
}
}