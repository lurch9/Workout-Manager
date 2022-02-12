const router = require("express").Router();
const { Workout } = require("../models/schema");
const path = require('path');
//show the exercise webpage
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));

  });

//show the stats webpage
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });


router.get('/api/workouts/range', (req, res) => {
    Workout.find().sort({ weight: -1 }).limit(7)
    .then(dbWorkouts => {
        console.log(dbWorkouts)
        res.json(dbWorkouts)
    })
    .catch(err => {
        console.log("RANGE ERROR", err)
        res.status(400).json(err);
    });
})

//get all workouts
router.get("/", (req, res) => {
    Workout.find({})
      .then((workoutData) => {
        res.json(workoutData);
      })
      .catch((error) => {
        res.json(error);
      });
  });

//get a specific workout

router.get("/api/workouts/:id", ({ params, body }, res) => {
    Workout.findById({ _id: params.id })
      .then((workoutData) => res.json(workoutData))
      .catch((error) => res.status(400).json(error));
  });

//get most recent workout
router.get('/api/workouts', (req, res) => {
    Workout.find({}, {}, { sort: { 'created_at' : -1 } })
    .then(dbWorkout => {
        console.log(dbWorkout)
        res.json(dbWorkout)
    })
    .catch(err => {
        console.log(err)
      res.status(400).json(err);
    });
    })

//add exercises
router.post('/api/workouts', ({ body }, res) => {
    Workout.create({})
    .then(dbWorkout => {
        console.log(dbWorkout)
      res.json(dbWorkout);
    })
    .catch(err => {
        console.log(err)
      res.status(400).json(err);
    });
})

//update workout
router.put('/api/workouts/:id', ({body, params}, res) => {
    Workout.findByIdAndUpdate(params.id, 
        {$push: {exercises: body}},
        {new: true, runValidators: true})
        .then(dbWorkouts => {
            res.json(dbWorkouts)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        });
})

module.exports = router;