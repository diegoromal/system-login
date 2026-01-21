export type SituatorEventResponse = {
  id: string;
  srcextension: string;
  situatoraccountcode: string;
  situatorzonecode: string;
  situatoreventcode: string;
  situatorpriority: string;
  situatorcondominium: string;
};

export type UpdateSituatorEventRequest = {
  srcextension: string;
  situatoraccountcode: string;
  situatorzonecode: string;
  situatoreventcode: string;
  situatorpriority: string;
  situatorcondominium: string;
};
