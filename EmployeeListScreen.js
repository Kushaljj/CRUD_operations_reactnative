import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee } from '../redux/actions';

export default function EmployeeListScreen({ navigation }) {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ paddingVertical: 10, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#ddd' }}
      onPress={() => navigation.navigate('EmployeeForm', { id: item.id })}
    >
      <Text>{item.name}</Text>
      <Text>{item.department}</Text>
      <Text>{item.age}</Text>
      <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => handleDelete(item.id)}>
        <Text style={{ color: 'red' }}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList data={employees} renderItem={renderItem} keyExtractor={(item) => item.id} />
      <TouchableOpacity style={{ position: 'absolute', bottom: 30, right: 30 }} onPress={() => navigation.navigate('EmployeeForm')}>
        <Text style={{ color: 'blue' }}>Add Employee</Text>
      </TouchableOpacity>
    </View>
  );
}
