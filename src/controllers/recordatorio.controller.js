import * as service from "../services/recordatorio.service.js";

export async function listar(req, res, next){
  try{
    const userId = req.user?.id || 1; // el mismo truco que usas en materias
    const data = await service.listarRecordatorios(userId);
    res.json({ success: true, data });
  }catch(e){ next(e); }
}
export async function consultarUna(req, res, next){
  try{
    const data = await service.consultarRecordatorio(req.params.id, req.user?.id || 1);
    if(!data) return res.status(404).json({ success: false, message: "No encontrado" });
    res.json({ success: true, data });
  }catch(e){ next(e); }
}
export async function crear(req, res, next){
  try{
    const id = await service.crearRecordatorio(req.body);
    res.status(201).json({ success: true, id });
  }catch(e){ next(e); }
}
export async function reemplazar(req, res, next){
  try{
    await service.reemplazarRecordatorio(req.params.id, req.body);
    res.json({ success: true });
  }catch(e){ next(e); }
}
export async function actualizarCamposCtrl(req, res, next){
  try{
    await service.actualizarCampos(req.params.id, req.body);
    res.json({ success: true });
  }catch(e){ next(e); }
}
export async function eliminar(req, res, next){
  try{
    await service.eliminarRecordatorio(req.params.id);
    res.json({ success: true });
  }catch(e){ next(e); }
}
export async function estado(req, res){
  res.json({ success: true, service: "recordatorio", status: "activo", time: new Date() });
}
