
// 自定义适配器

package com.example.listview;

import android.content.Context;
import android.media.Image;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.List;

public class FruitAdapter extends ArrayAdapter<Fruit> {
    private int resourceId;
    // 重写父类的构造函数，上下文，ListView 子项布局的 id，数据
    public FruitAdapter(Context context, int textViewResourceId, List<Fruit> objects){
        super(context,textViewResourceId,objects);
        resourceId = textViewResourceId;
    }

    // 重写 getView
    // 每个子项被滚动到屏幕内的时候会被调用
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        // 获取当前项的 Fruit 实例
        Fruit fruit = getItem(position);
        View view;
        // 用于对控件的实例进行缓存
        ViewHolder viewHolder;
        // convertView 用于将之前加载好的布局进行缓存
        if (convertView == null) {
            // 将这个子项加载到我们传入的布局
            // ListView 子项布局的 id，parent false 表示只让我们在父布局中声明的layout属性生效，但不会为这个 View 添加父布局
            view = LayoutInflater.from(getContext()).inflate(resourceId, parent, false);
            viewHolder = new ViewHolder();
            // 获取实例
            viewHolder.fruitImage = (ImageView) view.findViewById(R.id.fruit_image);
            viewHolder.fruitName = (TextView) view.findViewById(R.id.fruit_name);
            view.setTag(viewHolder);
        } else {
            view = convertView;
            viewHolder = (ViewHolder) view.getTag();
        }
        viewHolder.fruitImage.setImageResource(fruit.getImageId());
        viewHolder.fruitName.setText((fruit.getName()));
        return view;
    }

    class ViewHolder {
        ImageView fruitImage;
        TextView fruitName;
    }
}
