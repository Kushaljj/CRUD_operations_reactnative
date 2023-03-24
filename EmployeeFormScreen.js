import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, updateEmployee } from '../redux/actions';

export default function EmployeeFormScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);

  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [age, setAge] = useState('');

  const id = route.params?.id;
  const employee = employees.find((e) => e.id === id);

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setDepartment(employee.department);
      setAge(employee.age.toString());
    }
  }, [employee]);

  const handleSave = () => {
    const employeeData = {
      id: id ?? Math.random().toString(36).substr(2, 9),
      name,
      department,
      age: parseInt(age),
    };
    if (employee) {
      dispatch(updateEmployee(employeeData));
    } else {
      dispatch(addEmployee(employeeData));
    }
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#ddd' }} />
      <TextInput placeholder="Department" value={department} onChangeText={setDepartment} style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#ddd' }} />
      <TextInput placeholder="Age" value={age} onChangeText={setAge} style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#ddd' }} />
      <TouchableOpacity style={{ backgroundColor: 'blue', paddingVertical: 10, borderRadius: 5 }} onPress={handleSave}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
