from ultralytics import YOLO 


# Load the YOLOv8 model
model = YOLO('yolov8s.pt')

# Export the model to tensorflow js format
model.export(format='tfjs') 

# # Load the exported ONNX model

# onnx_model = YOLO('yolov8s_saved_model')

# # Run inference
# results = onnx_model('https://ultralytics.com/images/bus.jpg')