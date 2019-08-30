//<!-- Mostrar las base de datos -->
show dbs

//<!-- Crear una base de datos -->
use mycustomers

//<!-- Crear un usuario -->
db.createUser({
    user: 'fazt',
    pwd: '123',
    roles: ['readWrite', 'dbAdmin']
});

//<!-- Crear colecciones -->
db.createCollection('customers')

/* Mostrar colecciones */
show collections;

/** Insertar en una coleccion ,datos */
db.customers.insert({
    firstName: 'Isaac',
    lastName: 'Asimov'
})

/** Mostrar lo que tiene la conección customer */
db.customers.find()
    .pretty()

/** Insertar mutiples ficheros en la colección */
db.customers.insert(
    [
        { firstName: 'Joe', lastName: 'MacMillan' },
        { firstName: 'Elena', lastName: 'Soraya' },
        { firstName: 'Isaac', lastName: 'delahaye' }
    ]
)

db.customers.find();
// Buscar dentro de la colección los que tenga el nombre de Joe, tenga la columna firstName y no tenga lastName
db.customers.find({ firstName: 'Joe' }, { firstName: true, lastName: false });

// Buscando dentro de la colecci´n los que no tengan el nombre jESUS
db.usuarios.find({nombre: {$ne: "Jesus"}}).pretty() 

// reemplazar un dato
db.customers.update({ firstName: 'Joe' }, //query
    {
        firstName: 'Joe',
        lastName: 'MacMillan',
        gender: 'male'
    } // new data
);

// Agregar un nuevo dato dentro del JSON 
db.customers.update({ firstName: 'Isaac' }, {
    $set: { gender: 'male' }
});

db.customers.update({ firstName: 'Isaac' }, {
    $set: { age: 45 }
});

// Incrementar el valor age 5 años mas al registro con el primer nombre llamado isaac
db.customers.update({ firstName: 'Isaac' }, {
    $inc: { age: 5 }
});

// Eliminar el valor edad
db.customers.update({ firstName: 'Isaac' }, {
    $unset: { age: 1 }
})

db.customers.update({ firstName: 'Elena' }, {
    firstName: 'Elena',
    lastName: 'Soraya'
}, { upsert: true })

// Renombrar una columna
db.customers.update({ firstName: 'Isaac' }, {
    $rename: { "gender": "sex" }
})

// Eliminar los registros que cumplan con el fisrtName
db.customers.remove({ firstName: "Isaac" })

// Eliminar un solo registro que cumplan con el fisrtName
db.customers.remove({ firstName: "Isaac" }, { justOne: true })

db.customers.find({ firstName: "Elena" });
db.customers.find({ $or: [{ firstName: "Elena" }, { firstName: "Isaac" }] })
db.customers.fid({ gender: "male" })

db.customers.find({ age: { $lt: 40 } })
db.customers.find({ age: { $gt: 40 } })
db.customers.find({ age: { $gt: 30, $lt: 90 } });

db.customers.find({ "address.city": "Boston" })

db.customers.find({ name: { $regex: 'ston' } });

// sorting
db.customers.find().sort({ lastName: 1 });
db.customers.find().sort({ lastName: -1 });
db.customers.find().count()
db.customers.find({ gender: "male" }).count()
db.customers.find().limit(4)
db.customers.find().limit(4).sort({ lastName: -1 })

db.customers.find().forEach(function(doc) {
    print("Customer Name" + doc.firstName);
});