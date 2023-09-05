package com.exam.model;

import org.springframework.security.core.GrantedAuthority;

public class Authority implements GrantedAuthority{
private String authority;
	@Override
	public String getAuthority() {
		return this.authority = authority;
	}
	public Authority(String authority) {
		super();
		this.authority = authority;
	}

}
