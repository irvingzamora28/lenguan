<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|unique:categories|max:255',
        ]);

        $category = Category::create($validatedData);

        return response()->json(['message' => 'Category created successfully', 'data' => $category], 201);
    }

    public function update(Request $request, Category $category)
    {
        $validatedData = $request->validate([
            'name' => 'required|unique:categories|max:255',
        ]);

        $category->update($validatedData);

        return response()->json(['message' => 'Category updated successfully', 'data' => $category], 200);
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully'], 200);
    }

    public function index()
    {
        $categories = Category::all();

        return response()->json(['data' => $categories], 200);
    }

    public function show(Category $category)
    {
        return response()->json(['data' => $category], 200);
    }

    public function getCategories()
    {
        $categories = Category::all();

        return response()->json(['data' => $categories], 200);
    }

    public function getCategoriesWithNouns()
    {
        $categories = Category::with('nouns')->get();

        return response()->json(['data' => $categories], 200);
    }
}
