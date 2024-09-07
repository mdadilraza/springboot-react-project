package com.eidiko.ems_backend_application.service.service;

import com.eidiko.ems_backend_application.dto.EmployeeDto;
import com.eidiko.ems_backend_application.entity.Employee;
import com.eidiko.ems_backend_application.exception.ResourceNotFoundException;
import com.eidiko.ems_backend_application.modelmapper.EmployeeMapper;
import com.eidiko.ems_backend_application.repository.EmployeeRepository;
import com.eidiko.ems_backend_application.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
     Employee employee= employeeRepository.save(EmployeeMapper.mapToEmployee(employeeDto));
        return EmployeeMapper.mapToEmployeeDto(employee);

    }

    @Override
    public EmployeeDto getEmployeeById(long id){
      Employee employee=  employeeRepository.findById(id)
              .orElseThrow(() ->
                      new ResourceNotFoundException("Employee is not Exist with The given "+id));

      return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
      List<Employee>  employeeList =employeeRepository.findAll();
        return employeeList
                .stream()
                .map(EmployeeMapper::mapToEmployeeDto)
                .toList();
    }

    @Override
    public EmployeeDto updateEmployee(long id, EmployeeDto employeeDto) {
     EmployeeDto employee  = getEmployeeById(id);


     employee.setFirstName(employeeDto.getFirstName());
     employee.setLastName(employeeDto.getLastName());
     employee.setEmail(employeeDto.getEmail());
    employeeRepository.save(EmployeeMapper.mapToEmployee(employee));
        return employee;
    }

    @Override
    public EmployeeDto deleteEmployee(long id) {
        EmployeeDto employeeDto  = getEmployeeById(id);
        System.out.println(employeeDto);
      employeeRepository.delete(EmployeeMapper.mapToEmployee(employeeDto));
        System.out.println("deleted ");
      return employeeDto;
    }
}
