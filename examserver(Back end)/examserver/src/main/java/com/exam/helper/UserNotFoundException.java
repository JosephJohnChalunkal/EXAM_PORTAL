package com.exam.helper;

public class UserNotFoundException extends Exception {
	public UserNotFoundException() {
super("User with this Username not found in DB !! try with another one");
}
	public UserNotFoundException(String msg) {super(msg);}
}