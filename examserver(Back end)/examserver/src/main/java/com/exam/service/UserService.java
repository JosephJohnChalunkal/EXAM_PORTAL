package com.exam.service;

import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.exam.model.User;
import com.exam.model.UserRole;
@Service
@Transactional
public interface UserService {
//creating user
	public User createUser(User user,Set<UserRole>userRoles) throws Exception  ;
	
	//get user by username
	public  User getUser(String username);
	
	//delete User by Id
	public void deleteUser(Long userId);
	
	//update User By Id
	public User updateUser(User update,Long userId);
	
	
	}
