import Worker from '../models/Worker.js';

export const listWorkers = async (req, res) => {
  try {
    const {
      service,
      q,
      location
    } = req.query;

    const filter = {};

    if (
      service &&
      service !== 'All'
    ) {
      filter.service = service;
    }

    if (q) {
      const safe = q.replace(
        /[.*+?^${}()|[\]\\]/g,
        '\\$&'
      );

      filter.$or = [
        {
          name: new RegExp(safe, 'i')
        },
        {
          service: new RegExp(safe, 'i')
        },
        {
          location: new RegExp(safe, 'i')
        }
      ];
    }

    if (location) {
      filter.location = new RegExp(
        location,
        'i'
      );
    }

    const workers = await Worker.find(
      filter
    ).sort({
      verified: -1,
      available: -1,
      rating: -1,
      distanceKm: 1
    });

    res.json(workers);
  } catch (e) {
    res
      .status(500)
      .json({
        message: e.message
      });
  }
};

export const getMyWorkerProfile = async (
  req,
  res
) => {
  try {
    res.json(
      await Worker.findOne({
        user: req.user._id
      })
    );
  } catch (e) {
    res
      .status(500)
      .json({
        message: e.message
      });
  }
};

export const createOrUpdateWorkerProfile = async (
  req,
  res
) => {
  try {
    const {
      service,
      location,
      priceFrom,
      available = true
    } = req.body;

    if (
      !service ||
      !location ||
      priceFrom === undefined
    ) {
      return res
        .status(400)
        .json({
          message:
            'Service, location and price are required'
        });
    }

    const worker =
      await Worker.findOneAndUpdate(
        {
          user: req.user._id
        },
        {
          user: req.user._id,
          name: req.user.name,
          service,
          location,
          priceFrom: Number(priceFrom),
          available: Boolean(available)
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true
        }
      );

    res
      .status(200)
      .json(worker);
  } catch (e) {
    res
      .status(400)
      .json({
        message: e.message
      });
  }
};

export const seedWorkers = async (
  _req,
  res
) => {
  try {
    const count =
      await Worker.countDocuments({
        user: {
          $exists: false
        }
      });

    if (count) {
      return res.json({
        message:
          'Demo workers already seeded',
        count
      });
    }

    const data = [
      {
        name: 'Ramesh Kumar',
        service: 'Plumbing',
        location: 'Sector 14',
        distanceKm: 0.8,
        rating: 4.8,
        jobs: 184,
        priceFrom: 299,
        verified: true
      },
      {
        name: 'Amit Singh',
        service: 'Electrical',
        location: 'Sector 15',
        distanceKm: 1.2,
        rating: 4.7,
        jobs: 132,
        priceFrom: 349,
        verified: true
      },
      {
        name: 'Sunita Devi',
        service: 'Cleaning',
        location: 'Sector 12',
        distanceKm: 1.4,
        rating: 4.9,
        jobs: 210,
        priceFrom: 399,
        verified: true
      },
      {
        name: 'Mohit Verma',
        service: 'Carpentry',
        location: 'Sector 10',
        distanceKm: 2.1,
        rating: 4.6,
        jobs: 96,
        priceFrom: 499,
        verified: true
      },
      {
        name: 'Pooja Sharma',
        service: 'Painting',
        location: 'Sector 18',
        distanceKm: 2.8,
        rating: 4.8,
        jobs: 76,
        priceFrom: 699,
        verified: true
      },
      {
        name: 'Rajesh Yadav',
        service: 'Home Repair',
        location: 'Sector 9',
        distanceKm: 1.7,
        rating: 4.7,
        jobs: 118,
        priceFrom: 449,
        verified: true
      }
    ];

    const workers =
      await Worker.insertMany(data);

    res
      .status(201)
      .json(workers);
  } catch (e) {
    res
      .status(500)
      .json({
        message: e.message
      });
  }
};

export const toggleAvailability = async (
  req,
  res
) => {
  try {
    const worker =
      await Worker.findOne({
        user: req.user._id
      });

    if (!worker) {
      return res
        .status(404)
        .json({
          message:
            'Create your worker profile first'
        });
    }

    worker.available =
      !worker.available;

    await worker.save();

    res.json(worker);
  } catch (e) {
    res
      .status(400)
      .json({
        message: e.message
      });
  }
};