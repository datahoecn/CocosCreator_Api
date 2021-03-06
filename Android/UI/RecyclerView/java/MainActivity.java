
1.直接拖动组件，会自动添加依赖库
2.GridLayoutManager 网格布局
3.StaggeredGridLayoutManager 瀑布流布局


package com.example.recyclerview;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    private List<Fruit> fruitList = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initFruits(); // 初始化水果数据
        RecyclerView recyclerView = (RecyclerView) findViewById(R.id.recycler_view);
        // LayoutManager 用于指定 RecyclerView 的布局方式，线性布局
        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        layoutManager.setOrientation(LinearLayoutManager.HORIZONTAL);
        recyclerView.setLayoutManager(layoutManager);
        FruitAdapter adapter = new FruitAdapter(fruitList);
        recyclerView.setAdapter(adapter);
    }

    private void initFruits() {
            for (int i = 0; i < 2; i++) {
                Fruit apple = new Fruit("Apple", R.drawable.apple_pic);
                fruitList.add(apple);
                Fruit banana = new Fruit("Banana", R.drawable.banana_pic);
                fruitList.add(banana);
                Fruit orange = new Fruit("Orange", R.drawable.orange_pic);
                fruitList.add(orange);
                Fruit watermelon = new Fruit("Watermelon", R.drawable.watermelon_pic);
                fruitList.add(watermelon);
                Fruit pear = new Fruit("Pear", R.drawable.pear_pic);
                fruitList.add(pear);
                Fruit grape = new Fruit("Grape", R.drawable.grape_pic);
                fruitList.add(grape);
                Fruit pineapple = new Fruit("Pineapple", R.drawable.pineapple_pic);
                fruitList.add(pineapple);
                Fruit strawberry = new Fruit("Strawberry", R.drawable.strawberry_pic);
                fruitList.add(strawberry);
                Fruit cherry = new Fruit("Cherry", R.drawable.cherry_pic);
                fruitList.add(cherry);
                Fruit mango = new Fruit("Mango", R.drawable.mango_pic);
                fruitList.add(mango);
            }
        }
}
