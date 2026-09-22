import os
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = BASE_DIR / "models"
DEFAULT_MODEL_PATH = MODELS_DIR / "plant_disease_model.pth"
MODEL_WEIGHTS_PATH = str(DEFAULT_MODEL_PATH)
CLASS_INDICES_PATH = str(MODELS_DIR / "class_indices.json")
TEMPERATURE_PATH = str(MODELS_DIR / "temperature_T.json")

# Service Info
MODEL_NAME = "PlantDiseaseClassifier"
MODEL_ARCHITECTURE = "MobileNetV2-PlantVillage38"
MODEL_VERSION = "2.5.0"
NUM_CLASSES = 38
DEVICE = "cpu"

# Confidence Thresholds (configurable via environment, zero-deploy rollback)
HIGH_CONFIDENCE_THRESHOLD = float(os.getenv("AI_HIGH_CONFIDENCE", "0.80"))
MEDIUM_CONFIDENCE_THRESHOLD = float(os.getenv("AI_MEDIUM_CONFIDENCE", "0.50"))
# Legacy alias used by model.py
CONFIDENCE_THRESHOLD = MEDIUM_CONFIDENCE_THRESHOLD

# OOD Detection Thresholds (configurable via environment, set to extreme values to disable)
ENTROPY_OOD_THRESHOLD = float(os.getenv("AI_ENTROPY_OOD_THRESHOLD", "2.3"))
MARGIN_AMBIGUITY_THRESHOLD = float(os.getenv("AI_MARGIN_THRESHOLD", "0.10"))

# Temperature Scaling (set AI_TEMPERATURE=1.0 to disable calibration)
TEMPERATURE_OVERRIDE = os.getenv("AI_TEMPERATURE", None)

# Inference constraints
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}
MAX_IMAGE_SIZE_BYTES = 15 * 1024 * 1024  # 15 MB
IMAGE_INPUT_SIZE = (224, 224)

# Normalization constants (ImageNet defaults)
NORM_MEAN = [0.485, 0.456, 0.406]
NORM_STD = [0.229, 0.224, 0.225]

# Server Settings
HOST = os.getenv("AI_SERVICE_HOST", "0.0.0.0")
PORT = int(os.getenv("AI_SERVICE_PORT", "8000"))
DEBUG = os.getenv("DEBUG", "false").lower() == "true"
