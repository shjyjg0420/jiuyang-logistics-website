const express = require('express');
const router = express.Router();

// Placeholder routes
router.post('/', (req, res) => {
  res.json({ message: 'Create shipment' });
});

router.get('/', (req, res) => {
  res.json({ message: 'List shipments' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get shipment details', id: req.params.id });
});

router.put('/:id', (req, res) => {
  res.json({ message: 'Update shipment', id: req.params.id });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'Cancel shipment', id: req.params.id });
});

module.exports = router;
