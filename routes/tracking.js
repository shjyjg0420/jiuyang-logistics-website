const express = require('express');
const router = express.Router();

// Placeholder routes
router.get('/:trackingNumber', (req, res) => {
  res.json({ 
    message: 'Track shipment',
    trackingNumber: req.params.trackingNumber 
  });
});

router.get('/:trackingNumber/history', (req, res) => {
  res.json({ 
    message: 'Get tracking history',
    trackingNumber: req.params.trackingNumber 
  });
});

module.exports = router;
