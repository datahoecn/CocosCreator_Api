properties


method
	getPositionOffset 获取子对象的偏移位置。	Vec2 	let offset = tMXObjectGroup.getPositionOffset();
	// 源码少 return 用 tMXObjectGroup._properties;
	getProperty 通过属性名称，获取指定的属性	Any		let property = tMXObjectGroup.getProperty("info");
	getProperties 以映射的形式获取属性列表。	Object	let offset = tMXObjectGroup.getProperties();
	
	getObject 获取指定的对象。					Object | Null		let object = tMXObjectGroup.getObject("Group");
	getObjects 获取对象数组。					Array	let objects = tMXObjectGroup.getObjects();

	getGroupName 获取组名称。					String	let groupName = tMXObjectGroup.getGroupName();
	