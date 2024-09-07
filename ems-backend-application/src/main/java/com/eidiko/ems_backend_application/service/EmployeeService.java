package com.eidiko.ems_backend_application.service;

import com.eidiko.ems_backend_application.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {

    public EmployeeDto createEmployee(EmployeeDto employeeDto);
    public EmployeeDto getEmployeeById(long id);

    List<EmployeeDto> getAllEmployees();

    EmployeeDto updateEmployee(long id , EmployeeDto employeeDto);

    EmployeeDto deleteEmployee(long id);
}
