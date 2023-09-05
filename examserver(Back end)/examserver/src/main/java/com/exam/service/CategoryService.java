package com.exam.service;

import java.util.Set;

import com.exam.model.exam.Category;

public interface CategoryService {

	public Category addCategory(Category category);
	public Category updteCategory(Category category);
	public Set<Category> getCategories();
	public Category getCategory(Long categoryId);
	public void deleteCategory(Long categoryId);
	
}
