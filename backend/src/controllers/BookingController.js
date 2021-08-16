const Booking  = require('../models/Booking');

module.exports = {

  store: async (req, res) => {
    const { user_id } = req.headers;
    const { spot_id } = req.params;
    const { date } = req.body;

    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date
    });

    //pede para o mongo retornar o objeto de spot e user, ao invés do id deles.
    await booking.populate('spot').populate('user').execPopulate();

    return res.json(booking);
  }

};