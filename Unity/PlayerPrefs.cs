数据存储与读取
	PlayerPrefs是Unity自带的数据结构，位于UnityEngine命名空间下。
	可以对整数、浮点数、字符串3种类型的数据进行存取

整数的存取
	int num = 10; // 定义一个整型变量num
	PlayerPrefs.SetInt("Number",num); // 存储该变量
	int num  = PlayerPrefs.GetInt("Number");

浮点数的存取
	float PI = 3.14f; // 定义一个浮点数
	PlayerPrefs.SetFloat("PI",PI); // 存储该浮点数
	PI  = PlayerPrefs.GetFloat("PI"); // 读取该浮点数

字符串的存取
	string str = "Hello World!"; // 定义一个字符串
	PlayerPrefs.SetString("HW",str); // 存储该字符串
	str = PlayerPrefs.GetString("HW"); // 读取该字符串

其他PlayerPrefs接口
	PlayerPrefs.Save(); // 保存PlayerPrefs数据
	PlayerPrefs.HasKey("HW"); // 是否存在该键

	PlayerPrefs.DeleteKey("HW"); // 删除键
	PlayerPrefs.DeleteAll(); // 删除所有PlayerPrefs数据

属性访问器get和set
	private string name;
	public string Name
	{
	    get
	    {
	    return name;
	    }
	    set
	    {
	    name = value;
	    }
	}
属性访问器与PlayerPrefs
	public string Name
	{
	    get
	    {
	        return PlayerPrefs.GetString("Name");
	    }
	    set
	    {
	        PlayerPrefs.SetString("Name",value);
	        PlayerPrefs.Save();
	    }
	}

JSON
	public class Person
	{
	    public string name;
	    public int age;
	    public Person()
        {
        	// 必须加这个，否则会报错 Only objects with default constructors can be deserialized
        }
	    public Person(string _name,int _age)
	    {
	        name = _name;
	        age = _age;
	    }
	}


	using JsonFx.Json;

	void Start () {
        Person john = new Person("John",19);
        // 将对象序列化成JSON字符串
        string Json_Text = JsonWriter.Serialize(john);
        Debug.Log(Json_Text);
        // 将JSON字符串反序列化成对象
        john = JsonReader.Deserialize(Json_Text) as Person;
    }


数据存储
	using System.IO;

	string path =  "/Chapter8/8.2/data.txt";
	void OnGUI () {
        if(GUILayout.Button("保存"))
        {
            Write();
        }
        if(GUILayout.Button("读取"))
        {
            Read();
        }
    }
    void Write()
    {
        Person john = new Person("John",19);
        string Json_Text = JsonWriter.Serialize(john);
        File.WriteAllText (GetDataPath () +path, Json_Text);
    }
    void Read()
    {
        string Json_Text = File.ReadAllText (GetDataPath () +path);
        Person john = JsonReader.Deserialize<Person>(Json_Text);
        Debug.Log(john.name +"'s age is "+john.age);
    }
    public static string GetDataPath ()
    {
        if (Application.platform == RuntimePlatform.IPhonePlayer) {
            // iphone路径
            string path = Application.dataPath.Substring (0, Application.dataPath.Length - 5);
            path = path.Substring (0, path.LastIndexOf ('/'));
            return path + "/Documents";
        } else if (Application.platform == RuntimePlatform.Android) {
            // 安卓路径
            return Application.persistentDataPath + "/";
        } else
        {
            // 其他路径
            return Application.dataPath;
        }
    }


数据加密
	using System;
	using System.Text;
	using System.Security.Cryptography;

	static string key = "12348578902223367877723456789012";
	/// <summary>
	/// 字符串加密
	/// </summary>
	private static string Encrypt (string toE)
	{	// 设置字符串秘钥并转化为byte数组。这里使用32的字符串转化为长度为32的byte数组，也就是256位的秘钥
		byte[] keyArray = UTF8Encoding.UTF8.GetBytes (key);
		// 创建RijndaelManaged对象并设置参数
		RijndaelManaged rDel = new RijndaelManaged ();
		rDel.Key = keyArray;
		rDel.Mode = CipherMode.ECB;
		rDel.Padding = PaddingMode.PKCS7;
		ICryptoTransform cTransform = rDel.CreateEncryptor ();
		// 将原始字符串转化成byte数组
		byte[] toEncryptArray = UTF8Encoding.UTF8.GetBytes (toE);
		// 加密
		byte[] resultArray = cTransform.TransformFinalBlock (toEncryptArray, 0, toEncryptArray.Length);
		// 转换回字符串并返回
		return Convert.ToBase64String (resultArray, 0, resultArray.Length);
	}
	/// <summary>
	/// 字符串解密
	/// </summary>
	private static string Decrypt (string toD)
	{
		byte[] keyArray = UTF8Encoding.UTF8.GetBytes (key);
		
		RijndaelManaged rDel = new RijndaelManaged ();
		rDel.Key = keyArray;
		rDel.Mode = CipherMode.ECB;
		rDel.Padding = PaddingMode.PKCS7;
		ICryptoTransform cTransform = rDel.CreateDecryptor ();
		// 将加密后的字符串转化成byte数组
		byte[] toEncryptArray = Convert.FromBase64String (toD);
		// 解密
		byte[] resultArray = cTransform.TransformFinalBlock (toEncryptArray, 0, toEncryptArray.Length);
		// 转换回字符串并返回
		return UTF8Encoding.UTF8.GetString (resultArray);
	}