import Booking from '../models/Booking.js';
import Worker from '../models/Worker.js';

export const createBooking = async (req, res) => {
  try {
    const {
      workerId,
      date,
      time,
      address,
      paymentMethod = 'cash'
    } = req.body;

    if (!workerId || !date || !time || !address) {
      return res
        .status(400)
        .json({
          message: 'Worker, date, time and address are required'
        });
    }

    const worker = await Worker.findById(workerId);

    if (!worker) {
      return res
        .status(404)
        .json({
          message: 'Worker not found'
        });
    }

    if (!worker.available) {
      return res
        .status(409)
        .json({
          message: 'This worker is currently unavailable'
        });
    }

    const booking = await Booking.create({
      customer: req.user._id,
      customerName: req.user.name,
      worker: worker._id,
      service: worker.service,
      sku: `${worker.service
        .slice(0, 4)
        .toUpperCase()}-001`,
      date,
      time,
      address,
      amount: worker.priceFrom,
      paymentMethod,
      paymentStatus:
        paymentMethod === 'demo-online'
          ? 'paid'
          : 'pending'
    });

    worker.jobs += 1;

    await worker.save();

    res
      .status(201)
      .json(
        await booking.populate('worker')
      );
  } catch (e) {
    res
      .status(400)
      .json({
        message: e.message
      });
  }
};

export const listBookings = async (req, res) => {
  try {
    const filter =
      req.user.role === 'customer'
        ? {
            customer: req.user._id
          }
        : {
            worker: await Worker.findOne({
              user: req.user._id
            }).then((w) => w?._id)
          };

    if (
      req.user.role === 'worker' &&
      !filter.worker
    ) {
      return res.json([]);
    }

    res.json(
      await Booking.find(filter)
        .populate('worker')
        .sort({
          createdAt: -1
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

export const updateBooking = async (req, res) => {
  try {
    const {
      status,
      paymentStatus
    } = req.body;

    const booking = await Booking.findById(
      req.params.id
    ).populate('worker');

    if (!booking) {
      return res
        .status(404)
        .json({
          message: 'Booking not found'
        });
    }

    const isCustomer =
      req.user.role === 'customer' &&
      booking.customer.toString() ===
        req.user._id.toString();

    const isWorker =
      req.user.role === 'worker' &&
      booking.worker?.user?.toString() ===
        req.user._id.toString();

    if (!isCustomer && !isWorker) {
      return res
        .status(403)
        .json({
          message: 'Not authorized'
        });
    }

    if (status) {
      if (
        isCustomer &&
        status !== 'cancelled'
      ) {
        return res
          .status(403)
          .json({
            message:
              'Customers can only cancel bookings'
          });
      }

      if (
        isWorker &&
        ![
          'completed',
          'cancelled',
          'confirmed'
        ].includes(status)
      ) {
        return res
          .status(400)
          .json({
            message: 'Invalid status'
          });
      }

      booking.status = status;
    }

    if (paymentStatus) {
      booking.paymentStatus = paymentStatus;
    }

    await booking.save();

    res.json(booking);
  } catch (e) {
    res
      .status(400)
      .json({
        message: e.message
      });
  }
};