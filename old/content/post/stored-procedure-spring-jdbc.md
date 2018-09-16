---
layout: post
title: "Stored Procedures in Spring Jdbc"
date: "2011-12-21"
comments: true
categories:
  - "Code"
tags:
  - "ioc"
  - "java"
  - "oracle"
  - "spring"
description: In addition to some sweet Inversion of Control injection action, Spring brings flowers and baby deer.  And it brings some nice database connection help.  Sp
metaKeywords: ioc, java, oracle, spring
draft: false
---

In addition to some sweet Inversion of Control injection action, Spring brings flowers and baby deer.  And it brings some nice database connection help.  Spring JdbcTemplate is a vanguard of strength and ease for connecting to your favorite RDBMS.  And it so happens that the DBA I'm working with right now digs the stored procs.  So, we'll meet in the middle with some more goodness born of Spring.

<!--more-->

StoredProcedure
-----------------

Blessed Rod Johnson gives us the `org.springframework.jdbc.object.StoredProcedure`.  It's abstract, and you'll want to extend it and fully implement it in order to specify what stored proc in your database you're calling.  And here's a sample implementation:

```java
@Component
public class ItemInsert extends StoredProcedure {
  public static final String SPROC_NAME = "schema.oracle_pkg.proc_name";
  public static final String INPUT_PARAM = "input_prm_name";
  public static final String OUPUT_PARAM = "output_prm_name";

  @Inject
  public ItemInsert(DataSource ds) {
    super(ds, SPROC_NAME);
    declareParameter(new SqlParameter(INPUT_PARAM, Types.VARCHAR));
    declareParameter(new SqlOutParameter(OUTPUT_PARAM, Types.NUMERIC));
    compile();
  }
 
  public Item insert(Item item)
      throws DataAccessException {
    Map<String, Object> inputs = new HashMap<String, Object>();
    inputs.put(INPUT_PARAM, item.getSomething());
    Map<String, Object> output = super.execute(inputs);
    Object newId = output.get(OUTPUT_PARAM);
    if (newId != null) {
      item.setId(Long.parseLong(newId.toString()));
    }
    return item;
  }
}
```

Points to consider:

- `ItemInsert` is itself injectable as a Spring bean `@Component`.
- Input and output parameters are declared in the constructor
- `insert()` is where `super.execute()` is call, which is the function that really does the magic.

The only other interesting thing...

Execute()
-----------

From the JavaDoc:

  Execute the stored procedure. Subclasses should define a strongly typed execute method (with a meaningful name) that invokes this method, populating the input map and extracting typed values from the output map. Subclass execute methods will often take domain objects as arguments and return values.  Alternatively, they can return void.

Thusly, out method is called `insert()` because it's a meaningful name.  It takes our domain object, `Item` and pulls out the necessary fields inside the method, putting them into a map for the call `super.execute()`.

Call it from a service
----------------------

Now the only work left is just to call your awesome procedure and use the results for something wonderful.  Eg, 

```java
@Service
public class ItemServiceImpl implements ItemService {
      
  @Inject
  private ItemInsert itemInsert;

  public Item doWonderfulThingsWithItems(Item item) {
    return itemInsert.insert(item);
  }

}
```

Items are now stored procedurally and you can rest easy knowing that Oracle has all your data.

  
